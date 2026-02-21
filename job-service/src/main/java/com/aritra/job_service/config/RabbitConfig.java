package com.aritra.job_service.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    public static final String JOB_QUEUE = "job.queue";

    @Bean
    public Queue jobQueue() {
        return new Queue(JOB_QUEUE, true);
    }
}