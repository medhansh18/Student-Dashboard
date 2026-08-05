package com.example.dashboard.repository;

import com.example.dashboard.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository extends JpaRepository<Assignment, Long>{
}