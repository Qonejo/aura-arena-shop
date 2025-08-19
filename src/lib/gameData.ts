import { Product } from "@/components/ProductCard";
import { AuraLevel } from "@/components/AuraProgress";

// Mock data for the gaming shop
export const auraLevels: AuraLevel[] = [
  { level: 0, points_needed: 0, name: "Sin aura", flame_color: "white", prize: "-", character_size: 48 },
  { level: 1, points_needed: 240, name: "Chispa", flame_color: "blue", prize: "Sticker", character_size: 54 },
  { level: 2, points_needed: 800, name: "Brasa", flame_color: "green", prize: "5% off", character_size: 60 },
  { level: 3, points_needed: 1600, name: "Fuego", flame_color: "yellow", prize: "Accesorio", character_size: 68 },
  { level: 4, points_needed: 3200, name: "Llama", flame_color: "orange", prize: "10% off", character_size: 72 },
  { level: 5, points_needed: 6400, name: "Incendio", flame_color: "red", prize: "Regalo sorpresa", character_size: 76 },
  { level: 6, points_needed: 12800, name: "Místico", flame_color: "purple", prize: "15% off", character_size: 80 },
  { level: 7, points_needed: 25600, name: "Leyenda", flame_color: "black", prize: "Mega pack", character_size: 84 }
];

export const products: Product[] = [
  {
    id: "gomita__brownie",
    nombre: "Gomita + Brownie",
    descripcion: "¡El pack de inicio perfecto!",
    imagen: "promoa.png",
    bundle_precio: 190.0,
    stock: 15,
    promocion: true,
    aura_multiplier: 3.0
  },
  {
    id: "brow",
    nombre: "Brownies",
    precio: 150,
    imagen: "brow.png",
    stock: 12,
    descripcion: "Un clásico reconstituyente. ¡Restaura 10 HP!",
    aura_multiplier: 3.0
  },
  {
    id: "pelon",
    nombre: "Pelón pone rico",
    precio: 60,
    imagen: "pelon.png",
    stock: 27,
    descripcion: "Un clásico reconstituyente. ¡Restaura 10 HP!",
    aura_multiplier: 3.0
  },
  {
    id: "gomitas",
    nombre: "Gomita",
    precio: 60.0,
    imagen: "gomitas.png",
    stock: 12,
    descripcion: "Un clásico reconstituyente. ¡Restaura 250mg THC!",
    aura_multiplier: 3.0
  },
  {
    id: "Oll2",
    nombre: "Regular comercial",
    imagen: "Oll2.png",
    descripcion: "Un clásico reconstituyente. ¡Restaura 10 HP!",
    variaciones: { 
      "28 gr": { precio: 280, stock: 18 }, 
      "1 gr": { precio: 12, stock: 100 } 
    },
    stock: 118,
    aura_multiplier: 3.0
  },
  {
    id: "Caps",
    nombre: "Cápsulas concen. x10",
    precio: 450,
    imagen: "caps.png",
    stock: 9,
    descripcion: "Un clásico reconstituyente. ¡Restaura 10 HP!",
    aura_multiplier: 3.0
  },
  {
    id: "Oll3",
    nombre: "Hibrida Sinaloa",
    imagen: "Oll3.png",
    descripcion: "Un clásico reconstituyente. ¡Restaura 10 HP!",
    variaciones: { 
      "28 gr": { precio: 350, stock: 0 }, 
      "1 gr": { precio: 15, stock: 0 } 
    },
    stock: 0,
    aura_multiplier: 3.0
  },
  {
    id: "Oll4",
    nombre: "Hybrido, Bubba Kush",
    imagen: "Oll4.png",
    descripcion: "Un clásico reconstituyente. ¡Restaura 10 HP!",
    variaciones: { 
      "28 gr": { precio: 400, stock: 20 }, 
      "1 gr": { precio: 18, stock: 100 } 
    },
    stock: 120,
    aura_multiplier: 3.0
  }
];

export const availableEmojis = ["😀", "😺", "🦊", "🐼", "🐨", "🐸", "🐵", "🐯", "🐶", "🐰"];

export const getUserLevel = (auraPoints: number): AuraLevel => {
  for (let i = auraLevels.length - 1; i >= 0; i--) {
    if (auraPoints >= auraLevels[i].points_needed) {
      return auraLevels[i];
    }
  }
  return auraLevels[0];
};

export const getNextLevel = (currentLevel: AuraLevel): AuraLevel | undefined => {
  const currentIndex = auraLevels.findIndex(level => level.level === currentLevel.level);
  return currentIndex >= 0 && currentIndex < auraLevels.length - 1 
    ? auraLevels[currentIndex + 1] 
    : undefined;
};