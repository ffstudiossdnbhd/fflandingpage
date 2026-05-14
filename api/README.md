# Career Form Backend Setup

1. Import schema:
   - Open phpMyAdmin
   - Run `api/database.sql`

2. Configure backend:
   - Edit `api/config.php`
   - Set DB host/name/user/pass
   - Set `email_to` and `email_from`

3. Resume storage:
   - Uploaded files are stored in `api/uploads/resumes/`
   - Only PDF is accepted (max 50MB)

4. Frontend API URL:
   - Set `VITE_CAREER_FORM_API_URL` in `.env.local`
   - Example:
     `VITE_CAREER_FORM_API_URL=http://localhost/testwebsite/ff-3d-landing/api/submit_application.php`

5. Email note:
   - `submit_application.php` uses PHP `mail()`.
   - On local XAMPP, configure SMTP or use a mail relay for real delivery.
