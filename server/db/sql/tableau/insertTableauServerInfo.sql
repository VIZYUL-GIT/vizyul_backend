INSERT INTO webapp.servers
  (user_id, server_app_id, server_host, server_port, server_username, server_password, server_content_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING server_id, server_app_id, server_host, server_content_url;
  