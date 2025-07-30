/*
  # Create contact form tables

  1. New Tables
    - `consultation_requests`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `city` (text, required)
      - `state` (text, required)
      - `product_interest` (text, optional)
      - `hear_about` (text, optional)
      - `comments` (text, optional)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `team_applications`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `city` (text, required)
      - `state` (text, required)
      - `experience` (text, optional)
      - `hear_about` (text, optional)
      - `description` (text, optional)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for admins to manage all records
    - Add policies for public to insert new records (form submissions)
    - Add policies for users to view their own submissions