import { supabase } from "../supabase/supabase";

class Auth {
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { data: null, error };
    }

    const { data: profile, error: profileError } = await supabase
      .from("Users")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (profileError) {
      return { data: null, error: profileError };
    }

    const authData = {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      session: data.session,
      user: profile,
    };

    localStorage.setItem("accessToken", authData.accessToken);
    localStorage.setItem("refreshToken", authData.refreshToken);
    localStorage.setItem("user", JSON.stringify(authData.user));

    return {
      data: authData,
      error: null,
    };
  }

  async logout() {
    await supabase.auth.signOut();

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    return true;
  }

  async getUser() {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      return {
        user: JSON.parse(storedUser),
        error: null,
      };
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return { user: null, error };
    }

    const { data: profile, error: profileError } = await supabase
      .from("Users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      return { user: null, error: profileError };
    }

    localStorage.setItem("user", JSON.stringify(profile));

    return {
      user: profile,
      error: null,
    };
  }

  async getSession() {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("user");

    if (accessToken && refreshToken && user) {
      return {
        session: {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
        user: JSON.parse(user),
        error: null,
      };
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (!session) {
      return { session: null, error };
    }

    const { data: profile, error: profileError } = await supabase
      .from("Users")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (profileError) {
      return { session: null, error: profileError };
    }

    localStorage.setItem("accessToken", session.access_token);
    localStorage.setItem("refreshToken", session.refresh_token);
    localStorage.setItem("user", JSON.stringify(profile));

    return {
      session,
      user: profile,
      error: null,
    };
  }

  isAuthenticated() {
    return !!localStorage.getItem("accessToken");
  }
}

export default new Auth();