package com.example.dashboard.repository;

import com.example.dashboard.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long>{
    List<Assignment> findByCourseId(Long courseId);
}