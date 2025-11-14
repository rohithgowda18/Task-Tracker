package com.task.taskTracker.domain.dto;


import com.task.taskTracker.domain.entities.TaskPriority;
import com.task.taskTracker.domain.entities.TaskStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskDto(
        UUID  id,
        String title,
        String description,
        LocalDateTime dueDate,
        TaskPriority priority,
        TaskStatus status

) {

}
