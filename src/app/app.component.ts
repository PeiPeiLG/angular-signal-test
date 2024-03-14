import { Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-signal-test';

  task$ = new Subject<void>();

  taskCount = signal(0);
  doubleCount = computed(() => this.taskCount() * 2);
  effectRef = effect(() => {
    console.log(`Task count: ${this.taskCount()}`);
    console.log(`objectSignal: ${this.objectSignal().counter}`);
  });

  objectSignal = signal({ counter: 0 });

  ngOnInit(): void {
    this.taskCount.set(1);
    this.objectSignal.set({ counter: 1 });

    this.task$.subscribe(() => {
      this.taskCount.update((count) => count + 1);

      this.objectSignal.update((item) => ({
        ...item,
        counter: item.counter + 1,
      }));
    });
  }

  onClick() {
    this.task$.next();
  }
}
