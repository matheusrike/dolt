package com.matheusrike.dolt.api.security;

import com.matheusrike.dolt.api.entity.Role;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;

import java.util.Locale;

public class GrantedAuthorityAdapter implements GrantedAuthority {

    private final Role role;

    public GrantedAuthorityAdapter(Role role) {
        this.role = role;
    }

    @Override
    public @Nullable String getAuthority() {
        return "ROLE_" + this.role.getName().toUpperCase(Locale.ROOT);
    }
}
