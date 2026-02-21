package com.aritra.job_service.service;

import com.aritra.job_service.config.RabbitConfig;
import com.aritra.job_service.dto.CreateJobRequest;
import com.aritra.job_service.model.Job;
import com.aritra.job_service.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final RabbitTemplate rabbitTemplate;

    public Job createJob(CreateJobRequest request) {

        Job job = Job.builder()
                .type(request.getType())
                .payload(request.getPayload())
                .build();

        Job savedJob = jobRepository.save(job);

        rabbitTemplate.convertAndSend(
                RabbitConfig.JOB_QUEUE,
                savedJob.getId().toString()
        );

        return savedJob;
    }

    public Job getJobById(UUID id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    public List<Job> getAllJobs(String status) {
        if (status != null) {
            return jobRepository.findByStatus(status);
        }
        return jobRepository.findAll();
    }
}