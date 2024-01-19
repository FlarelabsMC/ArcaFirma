package com.squoshi.packdev.arcafirma.misc;

import net.minecraft.client.Minecraft;
import net.minecraft.client.gui.Font;
import net.minecraft.client.gui.components.CycleButton;
import net.minecraft.client.gui.components.EditBox;
import net.minecraft.client.gui.components.StringWidget;
import net.minecraft.client.gui.components.Tooltip;
import net.minecraft.client.gui.components.tabs.GridLayoutTab;
import net.minecraft.client.gui.layouts.GridLayout;
import net.minecraft.client.gui.layouts.LayoutSettings;
import net.minecraft.client.gui.screens.worldselection.WorldCreationUiState;
import net.minecraft.network.chat.Component;
import net.minecraft.world.Difficulty;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class GameTab extends GridLayoutTab {
    private final EditBox nameEdit;
    private final WorldCreationUiState uiState;

    public GameTab(WorldCreationUiState uiState) {
        super(Component.translatable("createWorld.tab.game.title"));

        this.uiState = uiState;

        this.uiState.setName("Save");

        GridLayout.RowHelper rowHelper = this.layout.rowSpacing(8).createRowHelper(1);
        LayoutSettings layoutsettings = rowHelper.newCellSettings();
        GridLayout.RowHelper rowHelper1 = (new GridLayout()).rowSpacing(4).createRowHelper(1);
        Font font = Minecraft.getInstance().font;

        rowHelper1.addChild(new StringWidget(Component.translatable("selectWorld.enterName"), font), rowHelper1.newCellSettings().paddingLeft(1));
        this.nameEdit = rowHelper1.addChild(
                new EditBox(font, 0, 0, 208, 20, Component.translatable("selectWorld.enterName")),
                rowHelper1.newCellSettings().padding(1)
        );
        this.nameEdit.setValue(this.uiState.getName());
        WorldCreationUiState state = this.uiState;
        Objects.requireNonNull(state);
        this.nameEdit.setResponder(state::setName);
        rowHelper.addChild(rowHelper1.getGrid(), rowHelper.newCellSettings().alignHorizontallyCenter());

        CycleButton<WorldCreationUiState.SelectedGameMode> gameModeCycleButton = rowHelper.addChild(
                CycleButton.builder((WorldCreationUiState.SelectedGameMode object) -> object.displayName)
                        .withValues(new WorldCreationUiState.SelectedGameMode[]{WorldCreationUiState.SelectedGameMode.SURVIVAL, WorldCreationUiState.SelectedGameMode.HARDCORE})
                        .create(0, 0, 210, 20, Component.translatable("selectWorld.gameMode"),
                                (button, selectedGameMode) -> this.uiState.setGameMode(selectedGameMode)),
                layoutsettings
        );
        this.uiState.addListener((worldCreationUiState) -> {
            gameModeCycleButton.setValue(worldCreationUiState.getGameMode());
            gameModeCycleButton.active = !worldCreationUiState.isDebug();
            gameModeCycleButton.setTooltip(Tooltip.create(worldCreationUiState.getGameMode().getInfo()));
        });

        List<Difficulty> values = Arrays.stream(Difficulty.values()).toList().stream().filter((difficulty) -> difficulty != Difficulty.PEACEFUL).toList();
        CycleButton<Difficulty> difficultyCycleButton = rowHelper.addChild(
                CycleButton.builder(Difficulty::getDisplayName)
                        .withValues(values)
                        .create(0, 0, 210, 20, Component.translatable("options.difficulty"),
                                (button, difficulty) -> this.uiState.setDifficulty(difficulty)),
                layoutsettings
        );
        this.uiState.addListener((worldCreationUiState) -> {
            difficultyCycleButton.setValue(this.uiState.getDifficulty());
            difficultyCycleButton.active = !this.uiState.isHardcore();
            difficultyCycleButton.setTooltip(Tooltip.create(this.uiState.getDifficulty().getInfo()));
        });
    }
}
