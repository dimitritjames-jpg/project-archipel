-- Business search sync webhook (pg_net -> Next.js /api/search/sync)

create extension if not exists pg_net with schema extensions;

create table if not exists private.search_sync_settings (
  id smallint primary key default 1 check (id = 1),
  webhook_url text not null default 'http://127.0.0.1:3000/api/search/sync',
  webhook_secret text not null default 'dev-search-sync-secret'
);

revoke all on table private.search_sync_settings from public;
grant select, update on table private.search_sync_settings to postgres, service_role;

insert into private.search_sync_settings (id, webhook_url, webhook_secret)
values (1, 'http://127.0.0.1:3000/api/search/sync', 'dev-search-sync-secret')
on conflict (id) do nothing;

create or replace function private.notify_business_search_sync()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  settings record;
  payload jsonb;
begin
  select webhook_url, webhook_secret
  into settings
  from private.search_sync_settings
  where id = 1;

  if settings.webhook_url is null or settings.webhook_url = '' then
    return coalesce(new, old);
  end if;

  if TG_OP = 'DELETE' then
    payload := jsonb_build_object(
      'type', 'DELETE',
      'table', TG_TABLE_NAME,
      'schema', TG_TABLE_SCHEMA,
      'record', null,
      'old_record', to_jsonb(old)
    );
  elsif TG_OP = 'INSERT' then
    payload := jsonb_build_object(
      'type', 'INSERT',
      'table', TG_TABLE_NAME,
      'schema', TG_TABLE_SCHEMA,
      'record', to_jsonb(new),
      'old_record', null
    );
  else
    payload := jsonb_build_object(
      'type', 'UPDATE',
      'table', TG_TABLE_NAME,
      'schema', TG_TABLE_SCHEMA,
      'record', to_jsonb(new),
      'old_record', to_jsonb(old)
    );
  end if;

  perform net.http_post(
    url := settings.webhook_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || settings.webhook_secret
    ),
    body := payload
  );

  return coalesce(new, old);
end;
$$;

drop trigger if exists businesses_search_sync_webhook on public.businesses;

create trigger businesses_search_sync_webhook
  after insert or update or delete on public.businesses
  for each row
  execute function private.notify_business_search_sync();
