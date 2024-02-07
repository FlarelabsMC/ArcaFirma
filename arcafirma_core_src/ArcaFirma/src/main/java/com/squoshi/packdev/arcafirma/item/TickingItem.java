package com.squoshi.packdev.arcafirma.item;

import net.minecraft.world.entity.Entity;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.Level;
import org.jetbrains.annotations.Nullable;

public class TickingItem extends Item {
    private final InventoryTickCallback inventoryTick;

    public TickingItem(Properties p, @Nullable InventoryTickCallback inventoryTick) {
        super(p);
        this.inventoryTick = inventoryTick;
    }

    @Override
    public void inventoryTick(ItemStack stack, Level level, Entity entity, int slotIndex, boolean isSelected) {
        super.inventoryTick(stack, level, entity, slotIndex, isSelected);
        if (inventoryTick != null) {
            inventoryTick.tick(stack, level, entity, slotIndex, isSelected);
        }
    }

    @FunctionalInterface
    public interface InventoryTickCallback {
        void tick(ItemStack stack, Level level, Entity entity, int slotIndex, boolean isSelected);
    }
}
