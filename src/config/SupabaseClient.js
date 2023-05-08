import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://equfgurskvjaicpyguoe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxdWZndXJza3ZqYWljcHlndW9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMzODc3NDYsImV4cCI6MTk5ODk2Mzc0Nn0.2OdfFkPRzwTnnsjHiUCs871ep0vrxRkRsyOqyEQe6-I'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase