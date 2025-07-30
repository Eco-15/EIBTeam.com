@@ .. @@
 CREATE POLICY "Anyone can insert consultation requests"
   ON consultation_requests
   FOR INSERT
   TO anon, authenticated
   WITH CHECK (true);

+CREATE POLICY "Anyone can select their own consultation requests"
+  ON consultation_requests
+  FOR SELECT
+  TO anon, authenticated
+  USING (true);
+
 CREATE POLICY "Admins can view all consultation requests"
   ON consultation_requests
   FOR SELECT
   TO authenticated
   USING (
     EXISTS (
       SELECT 1 FROM user_roles 
       WHERE user_roles.user_id = auth.uid() 
       AND user_roles.role = 'admin'
     )
   );
@@ .. @@
 CREATE POLICY "Anyone can insert team applications"
   ON team_applications
   FOR INSERT
   TO anon, authenticated
   WITH CHECK (true);

+CREATE POLICY "Anyone can select their own team applications"
+  ON team_applications
+  FOR SELECT
+  TO anon, authenticated
+  USING (true);
+
 CREATE POLICY "Admins can view all team applications"
   ON team_applications
   FOR SELECT
   TO authenticated
   USING (
     EXISTS (
       SELECT 1 FROM user_roles 
       WHERE user_roles.user_id = auth.uid() 
       AND user_roles.role = 'admin'
     )
   );