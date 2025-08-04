import z from 'zod';
import { AppSchema } from '../validation/generated';

export const ZApp = AppSchema;

export type IApp = (typeof ZApp)['_output'];

export const ZApps = ZApp.array();

export type IApps = (typeof ZApps)['_output'];

export const ZAppCreateInput = AppSchema.pick({
  name: true,
  description: true,
  git_repository: true,
  build_pack: true,
}).extend({
  project_id: z.string(),
});

export type IAppCreateInput = (typeof ZAppCreateInput)['_output'];

export const ZAppMetaSchema = z.object({
  id: z.number().nullable().optional(),
  description: z.string().nullable().optional(),
  repository_project_id: z.number().nullable().optional(),
  uuid: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  fqdn: z.string().nullable().optional(),
  config_hash: z.string().nullable().optional(),
  git_repository: z.string().nullable().optional(),
  git_branch: z.string().nullable().optional(),
  git_commit_sha: z.string().nullable().optional(),
  git_full_url: z.string().nullable().optional(),
  docker_registry_image_name: z.string().nullable().optional(),
  docker_registry_image_tag: z.string().nullable().optional(),
  build_pack: z.string().nullable().optional(),
  static_image: z.string().nullable().optional(),
  install_command: z.string().nullable().optional(),
  build_command: z.string().nullable().optional(),
  start_command: z.string().nullable().optional(),
  ports_exposes: z.string().nullable().optional(),
  ports_mappings: z.string().nullable().optional(),
  custom_network_aliases: z.string().nullable().optional(),
  base_directory: z.string().nullable().optional(),
  publish_directory: z.string().nullable().optional(),
  health_check_enabled: z.boolean().nullable().optional(),
  health_check_path: z.string().nullable().optional(),
  health_check_port: z.string().nullable().optional(),
  health_check_host: z.string().nullable().optional(),
  health_check_method: z.string().nullable().optional(),
  health_check_return_code: z.number().nullable().optional(),
  health_check_scheme: z.string().nullable().optional(),
  health_check_response_text: z.string().nullable().optional(),
  health_check_interval: z.number().nullable().optional(),
  health_check_timeout: z.number().nullable().optional(),
  health_check_retries: z.number().nullable().optional(),
  health_check_start_period: z.number().nullable().optional(),
  limits_memory: z.string().nullable().optional(),
  limits_memory_swap: z.string().nullable().optional(),
  limits_memory_swappiness: z.number().nullable().optional(),
  limits_memory_reservation: z.string().nullable().optional(),
  limits_cpus: z.string().nullable().optional(),
  limits_cpuset: z.string().nullable().optional(),
  limits_cpu_shares: z.number().nullable().optional(),
  status: z.string().nullable().optional(),
  preview_url_template: z.string().nullable().optional(),
  destination_type: z.string().nullable().optional(),
  destination_id: z.number().nullable().optional(),
  source_id: z.number().nullable().optional(),
  private_key_id: z.number().nullable().optional(),
  environment_id: z.number().nullable().optional(),
  dockerfile: z.string().nullable().optional(),
  dockerfile_location: z.string().nullable().optional(),
  custom_labels: z.string().nullable().optional(),
  dockerfile_target_build: z.string().nullable().optional(),
  manual_webhook_secret_github: z.string().nullable().optional(),
  manual_webhook_secret_gitlab: z.string().nullable().optional(),
  manual_webhook_secret_bitbucket: z.string().nullable().optional(),
  manual_webhook_secret_gitea: z.string().nullable().optional(),
  docker_compose_location: z.string().nullable().optional(),
  docker_compose: z.string().nullable().optional(),
  docker_compose_raw: z.string().nullable().optional(),
  docker_compose_domains: z.string().nullable().optional(),
  docker_compose_custom_start_command: z.string().nullable().optional(),
  docker_compose_custom_build_command: z.string().nullable().optional(),
  swarm_replicas: z.number().nullable().optional(),
  swarm_placement_constraints: z.string().nullable().optional(),
  custom_docker_run_options: z.string().nullable().optional(),
  post_deployment_command: z.string().nullable().optional(),
  post_deployment_command_container: z.string().nullable().optional(),
  pre_deployment_command: z.string().nullable().optional(),
  pre_deployment_command_container: z.string().nullable().optional(),
  watch_paths: z.string().nullable().optional(),
  custom_healthcheck_found: z.boolean().nullable().optional(),
  redirect: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  deleted_at: z.string().nullable().optional(),
  compose_parsing_version: z.string().nullable().optional(),
  custom_nginx_configuration: z.string().nullable().optional(),
  is_http_basic_auth_enabled: z.boolean().nullable().optional(),
  http_basic_auth_username: z.string().nullable().optional(),
  http_basic_auth_password: z.string().nullable().optional(),
});

export type IAppMetaSchema = (typeof ZAppMetaSchema)['_output'];

export const ZAppIdInput = z.object({
  appId: z.string(),
});

export type IAppIdInput = (typeof ZAppIdInput)['_output'];
