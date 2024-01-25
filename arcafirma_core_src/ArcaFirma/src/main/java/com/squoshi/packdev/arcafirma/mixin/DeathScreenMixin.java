package com.squoshi.packdev.arcafirma.mixin;

import com.google.common.collect.Lists;
import net.minecraft.ChatFormatting;
import net.minecraft.client.gui.components.Button;
import net.minecraft.client.gui.screens.DeathScreen;
import net.minecraft.client.gui.screens.Screen;
import net.minecraft.network.chat.Component;
import net.minecraft.network.chat.Style;
import org.spongepowered.asm.mixin.Final;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

import javax.annotation.Nullable;
import java.util.List;

@Mixin(DeathScreen.class)
public class DeathScreenMixin extends Screen {
    @Shadow
    private int delayTicker;
    @Final
    @Shadow
    public final List<Button> exitButtons = Lists.newArrayList();
    @Shadow
    private Component deathScore;

    protected DeathScreenMixin(Component title) {
        super(title);
    }

    @Inject(method = {"init()V"}, at = {@At("HEAD")}, cancellable = true)
    private void init(CallbackInfo ci) {
        this.delayTicker = 0;
        this.exitButtons.clear();
        this.deathScore = Component.translatable("deathScreen.score").append(": ").append(Component.literal(Integer.toString(this.minecraft.player.getScore())).withStyle(ChatFormatting.YELLOW));
        ci.cancel();
    }
}
