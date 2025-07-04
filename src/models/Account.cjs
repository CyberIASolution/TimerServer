// models/account.js
const supabase = require("../lib/supabaseClient.cjs");

const table = 'accounts';

const AccountModel = {
    async create({ username, password, minuteCost }) {
        if (!minuteCost) minuteCost = 10;
        const { data, error } = await supabase
            .from(table)
            .insert([{ username, password, minuteCost }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async findByUsername(username) {
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('username', username)
            .single();

        if (error) return null; // ou throw error si tu préfères
        return data;
    },

    async findById(id) {
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('id', id)
            .single();

        if (error) return null;
        return data;
    },

    async updatePassword(id, newPassword) {
        const { data, error } = await supabase
            .from(table)
            .update({ password: newPassword })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async updateMinuteCost(id, newMinuteCost) {
        const { data, error } = await supabase
            .from(table)
            .update({ minuteCost: newMinuteCost })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};

module.exports = AccountModel;
