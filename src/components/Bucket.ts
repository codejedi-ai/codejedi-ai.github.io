export class Bucket {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private color: string;
  private category: string;
  private items: string[] = [];

  constructor(x: number, y: number, width: number, height: number, color: string, category: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.category = category;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // Draw the bucket (square)
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Add label
    ctx.fillStyle = 'white';
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.category, this.x + this.width / 2, this.y + 30);

    // Show number of items inside
    if (this.items.length > 0) {
      ctx.fillText(`(${this.items.length})`, this.x + this.width / 2, this.y + 60);
    }
  }

  isPointInside(x: number, y: number): boolean {
    return x >= this.x && 
           x <= this.x + this.width && 
           y >= this.y && 
           y <= this.y + this.height;
  }

  addItem(category: string): void {
    this.items.push(category);
  }

  removeItem(category: string): void {
    const index = this.items.indexOf(category);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  getCategory(): string {
    return this.category;
  }

  getItems(): string[] {
    return this.items;
  }
}