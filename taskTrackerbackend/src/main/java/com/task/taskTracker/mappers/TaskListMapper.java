package com.task.taskTracker.mappers;

import com.task.taskTracker.domain.dto.TaskListDto;
import com.task.taskTracker.domain.entities.TaskList;

public interface TaskListMapper {
    TaskList fromDto(TaskListDto taskListDto);

    TaskListDto toDto(TaskList taskList);
}
