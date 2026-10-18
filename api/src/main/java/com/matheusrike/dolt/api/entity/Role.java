package com.matheusrike.dolt.api.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;

import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // Allowed to Hibernate, but vetoed for the application
@Entity
@Table(name = "tb_role")
public class Role implements GrantedAuthority {

    // Database Columns represented by class attributes with JPA annotations
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 255, unique = true)
    private String name;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    // Constructor
    public Role(String name) {
        this.name = name;
    }

    // Callbacks
    @PrePersist
    private void prePersist() {
        this.createdAt = OffsetDateTime.now();
    }

    @PreUpdate
    private void preUpdate() {
        this.updatedAt = OffsetDateTime.now();
    }

    // Required by the interface GrantedAuthority (Spring Security)
    @Override
    public @Nullable String getAuthority() {
        return "ROLE_" + this.name.toUpperCase();
    }
}
