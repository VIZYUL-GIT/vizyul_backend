SELECT *
FROM webapp.sessions
WHERE session_app_id = $1;