import { Component, computed, signal } from '@angular/core';

type Product = {
  name: string;
  type: string;
  description: string;
  format: string;
  image: string;
  age: "new" | "old";
};

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'Revueltas Charcuteria Y Especialidades';
  protected readonly description =
    'Seleccion de embutidos, quesos y conservas para preparar mesas con sabor tradicional y presentacion actual.';

  protected readonly products: Product[] = [
    {
      name: 'Empanada de queso y cebolla caramelizada',
      type: 'Empanadas',
      description: 'Corte fino, sabor intenso y curacion equilibrada para aperitivos y tablas.',
      format: 'Sobre 100 g',
      image:
        '/Empanada.jpeg',
        age: "new"
    },
    {
      name: 'Chorizo extra dulce',
      type: 'Embutidos',
      description: 'Embutido clasico con pimenton suave y textura firme.',
      format: 'Pieza o loncheado',
      image:
        '',
        age: "old"
    },
    {
      name: 'Chorizo extra dulce',
      type: 'Embutidos',
      description: 'Embutido clasico con pimenton suave y textura firme.',
      format: 'Pieza o loncheado',
      image:
        '',
        age: "old"
    }
  ];

  protected readonly featuredProducts = this.products.filter((product) => product.age === "new")
  protected readonly productTypes = ['Todos', ...new Set(this.products.map((product) => product.type))];
  protected readonly selectedType = signal('Todos');
  protected readonly searchTerm = signal('');

  protected readonly filteredProducts = computed(() => {
    const selectedType = this.selectedType();
    const searchTerm = this.normalize(this.searchTerm());

    return this.products.filter((product) => {
      const matchesType = selectedType === 'Todos' || product.type === selectedType;
      const matchesSearch =
        searchTerm.length === 0 ||
        this.normalize(`${product.name} ${product.type} ${product.description}`).includes(searchTerm);

      return matchesType && matchesSearch;
    });
  });

  protected selectType(type: string): void {
    this.selectedType.set(type);
  }

  protected updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
