INSERT INTO webapp.uploads
  (user_id, session_id, upload_app_id, upload_file_name)
  VALUES ($1, $2, $3, $4)
  RETURNING upload_app_id;