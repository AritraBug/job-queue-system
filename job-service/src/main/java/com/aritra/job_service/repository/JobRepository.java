package com.aritra.job_service.repository;

import com.aritra.job_service.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JobRepository extends JpaRepository<Job, UUID> {

    List<Job> findByStatus(String status);
}