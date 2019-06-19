UPDATE webapp.servers
SET server_host = $3, 
  server_port = $4, 
  server_username = $5, 
  server_password = $6, 
  server_content_url = $7
WHERE user_id = $1
  AND server_id = $2;
