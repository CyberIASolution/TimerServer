// lib/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');
const { supabase: sb } = require("../config/index.cjs");

const supabase = createClient(sb.URL, sb.KEY);

module.exports = supabase;
