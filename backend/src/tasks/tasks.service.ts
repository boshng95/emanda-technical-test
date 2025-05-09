import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepo: Repository<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.title = createTaskDto.title;
    if (createTaskDto.parentId) {
      task.parent = (await this.tasksRepo.findOneBy({ id: createTaskDto.parentId })) ?? undefined;
    }
    return this.tasksRepo.save(task);
  }

  async findAll(): Promise<Task[]> {
    const buildTaskTree = async (task: Task): Promise<Task> => {
      const subtasks = await this.tasksRepo.find({
        where: { parent: { id: task.id } },
        relations: ['parent'],
      });
  
      task.subtasks = await Promise.all(subtasks.map(buildTaskTree));
      return task;
    };
  
    const rootTasks = await this.tasksRepo.find({
      where: { parent: undefined },
      relations: ['parent'],
    });
  
    return Promise.all(rootTasks.map(buildTaskTree));
  }

  async findSubtasks(parentId: number): Promise<Task[]> {
    return this.tasksRepo.find({
      where: { parent: { id: parentId } },
      relations: ['subtasks', 'parent']
    });
  }
}