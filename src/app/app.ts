import { Component, computed, signal } from '@angular/core';

type Product = {
  name: string;
  type: string;
  description: string;
  format: string;
  price: string;
  image: string;
};

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'Charcuteria Revueltas';
  protected readonly description =
    'Seleccion de embutidos, quesos y conservas para preparar mesas con sabor tradicional y presentacion actual.';

  protected readonly products: Product[] = [
    {
      name: 'Jamon iberico de cebo',
      type: 'Jamones',
      description: 'Corte fino, sabor intenso y curacion equilibrada para aperitivos y tablas.',
      format: 'Sobre 100 g',
      price: 'Desde 8,90 EUR',
      image:
        'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=900&q=80',
    },
    {
      name: 'Chorizo extra dulce',
      type: 'Embutidos',
      description: 'Embutido clasico con pimenton suave y textura firme.',
      format: 'Pieza o loncheado',
      price: 'Desde 4,50 EUR',
      image:
        'https://commons.wikimedia.org/wiki/Special:FilePath/Chorizo_Extra_Bellota.jpg?width=900',
    },
    {
      name: 'Salchichon curado',
      type: 'Embutidos',
      description: 'Aroma especiado y curacion lenta para un bocado redondo.',
      format: 'Pieza o loncheado',
      price: 'Desde 4,20 EUR',
      image:
        'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80',
    },
    {
      name: 'Queso manchego semicurado',
      type: 'Quesos',
      description: 'Queso de pasta compacta con notas lacticas y final persistente.',
      format: 'Cuna al peso',
      price: 'Desde 6,75 EUR',
      image:
        'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=900&q=80',
    },
    {
      name: 'Lomo embuchado',
      type: 'Embutidos',
      description: 'Lonchas magras con adobo tradicional y curacion natural.',
      format: 'Sobre 100 g',
      price: 'Desde 7,30 EUR',
      image:
        'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=80',
    },
    {
      name: 'Morcilla artesana',
      type: 'Frescos',
      description: 'Producto de obrador ideal para plancha, guisos y tapas calientes.',
      format: 'Unidad',
      price: 'Desde 3,80 EUR',
      image:
        'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?auto=format&fit=crop&w=900&q=80',
    },
    {
      name: 'Aceitunas aliñadas',
      type: 'Conservas',
      description: 'Aceitunas con aliño mediterraneo para acompanar cualquier tabla.',
      format: 'Tarrina 250 g',
      price: 'Desde 3,20 EUR',
      image:
        'https://commons.wikimedia.org/wiki/Special:FilePath/Aceitunas_ali%C3%B1adas_a_la_madrile%C3%B1a.jpg?width=900',
    },
    {
      name: 'Tabla surtida Revueltas',
      type: 'Tablas',
      description: 'Combinacion de jamon, embutidos y queso preparada para compartir.',
      format: '2-4 personas',
      price: 'Desde 19,90 EUR',
      image:
        'https://images.unsplash.com/photo-1546039907-7fa05f864c02?auto=format&fit=crop&w=900&q=80',
    },
  ];

  protected readonly featuredProducts = this.products.slice(0, 3);
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
