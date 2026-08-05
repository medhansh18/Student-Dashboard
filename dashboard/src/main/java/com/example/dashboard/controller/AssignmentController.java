package com.example.dashboard.controller;

import com.example.dashboard.model.Assignment;
import com.example.dashboard.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    @PostMapping
    public Assignment addAssignment(@RequestBody Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    @GetMapping("/{id}")
    public Assignment getAssignmentById(@PathVariable Long id) {
        return assignmentRepository.findById(id).orElseThrow();
    }

    @DeleteMapping("/{id}")
    public void deleteAssignment(@PathVariable Long id) {
        assignmentRepository.deleteById(id);
    }
}