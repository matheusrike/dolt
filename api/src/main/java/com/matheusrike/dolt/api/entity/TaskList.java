package com.matheusrike.dolt.api.entity;

import jakarta.persistence.*;

import java.time.OffsetDateTime;
import java.util.UUID;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // Allowed to Hibernate, but vetoed for the application
@Entity
@Table(name = "tb_tasklist")
public class TaskList {

    // Database Columns represented by class attributes with JPA annotations
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_user_id", nullable = false)
    private User user;

    // Constructor
    public TaskList(String title, User user) {
        this.title = title;
        this.user = user;
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
}
