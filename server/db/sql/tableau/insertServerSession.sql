INSERT INTO webapp.server_sessions
  (user_id, server_id, server_session_app_id, server_session_name)
  VALUES ($1, $2, $3, $4)
  RETURNING server_session_id, server_session_app_id, server_session_name;
