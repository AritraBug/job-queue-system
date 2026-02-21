package com.aritra.job_service.worker;

import com.aritra.job_service.model.Job;
import com.aritra.job_service.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class JobWorker {

    private final JobRepository jobRepository;

    @RabbitListener(queues = "job.queue")
    public void processJob(String jobId) {

        log.info("Received job from queue: {}", jobId);

        Job job = jobRepository.findById(UUID.fromString(jobId))
                .orElseThrow(() -> new RuntimeException("Job not found"));

        try {
            // Update status to PROCESSING
            job.setStatus("PROCESSING");
            jobRepository.save(job);

            // Simulate processing
            Thread.sleep(3000);

            // Mark completed
            job.setStatus("COMPLETED");
            jobRepository.save(job);

            log.info("Job completed: {}", jobId);

        } catch (Exception e) {
            job.setStatus("FAILED");
            job.setRetryCount(job.getRetryCount() + 1);
            jobRepository.save(job);

            log.error("Job failed: {}", jobId);
        }
    }
}