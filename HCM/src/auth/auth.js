import { supabase } from "../supabase/supabase";

class Auth {
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  }

  async logout() {
    const { error } = await supabase.auth.signOut();

    return { error };
  }

  async getUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    return { user, error };
  }

  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    return { session, error };
  }

  async isAuthenticated() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return !!session;
  }
}

export default new Auth();