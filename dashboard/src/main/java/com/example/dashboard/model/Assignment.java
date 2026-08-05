package com.example.dashboard.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private LocalDate dueDate;
    private boolean completed;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
}