INSERT INTO webapp.sessions
  (user_id, session_app_id, session_name)
  VALUES ($1, $2, $3)
  RETURNING session_id, session_app_id, session_name;