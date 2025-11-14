package com.task.taskTracker.mappers;

import com.task.taskTracker.domain.dto.TaskDto;
import com.task.taskTracker.domain.entities.Task;

public interface TaskMapper {

    Task fromDto(TaskDto taskDto);

    TaskDto toDto(Task task);

}
