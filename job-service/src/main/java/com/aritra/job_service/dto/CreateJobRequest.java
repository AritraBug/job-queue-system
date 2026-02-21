package com.aritra.job_service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateJobRequest {

    @NotBlank(message = "Job type is required")
    private String type;

    @NotBlank(message = "Payload is required")
    private String payload;
}