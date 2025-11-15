package com.task.taskTracker.services;

import com.task.taskTracker.domain.entities.Task;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskService {
    List<Task> listTasks(UUID taskListId);

    Task createTasks(UUID taskListId,Task task);

    Optional<Task> getTask(UUID taskListId,UUID taskId);

    Task updateTask(UUID taskListId,UUID taskId,Task task);


    void deleteTask(UUID taskListId , UUID taskId);
}
