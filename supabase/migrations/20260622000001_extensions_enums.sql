-- Project Archipel: extensions and enums
create extension if not exists pgcrypto with schema extensions;
create extension if not exists citext with schema extensions;
create extension if not exists postgis with schema extensions;
create extension if not exists pg_trgm with schema extensions;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to postgres, service_role;

create type public.island_code as enum ('STT', 'STX', 'STJ', 'WI');
create type public.business_status as enum ('draft', 'pending_review', 'published', 'suspended', 'archived');
create type public.premium_tier as enum ('none', 'featured', 'signature');
create type public.member_role as enum ('owner', 'editor', 'analyst');
create type public.media_kind as enum ('image', 'video');
create type public.media_status as enum ('processing', 'ready', 'failed', 'archived');
create type public.review_status as enum ('pending', 'approved', 'rejected', 'flagged');
create type public.engagement_kind as enum ('profile_view', 'website_click', 'phone_click', 'directions_click', 'save', 'share');
create type public.operational_status as enum ('scheduled', 'delayed', 'cancelled', 'suspended', 'unknown');
create type public.cruise_call_status as enum ('scheduled', 'arrived', 'departed', 'cancelled', 'changed');
create type public.outbox_operation as enum ('upsert', 'delete');
