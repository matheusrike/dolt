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
@Table(name = "tb_task")
public class Task {

    // Database Columns represented by class attributes with JPA annotations
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_checked", nullable = false)
    private boolean checked;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_tasklist_id", nullable = false)
    private TaskList taskList;

    // Constructor
    public Task(String title, String description, TaskList taskList) {
        this.title = title;
        this.description = description;
        this.taskList = taskList;
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
