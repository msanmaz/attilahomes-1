-- Add net and gross square metre fields to properties
alter table properties
  add column if not exists net_sqm int,
  add column if not exists brut_sqm int;
