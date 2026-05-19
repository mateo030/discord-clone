package com.discordclone.backend_service.channelmember;

import java.sql.Timestamp;
import java.util.UUID;

import com.discordclone.backend_service.channel.Channel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "channel_members")
public class ChannelMember {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID) 
    private UUID id;

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "channel_id", insertable = false, updatable = false)
    private UUID channelId;

    @Column(name="created_at")
    @NotNull
    private Timestamp createdAt;

    @Column(name="created_user_id")
    @NotNull
    private UUID createdUserId;

    @Column(name="updated_at")
    @NotNull
    private Timestamp updatedAt;

    @Column(name="updated_user_id")
    @NotNull
    private UUID updatedUserId;

    @Column(name="is_deleted")
    @NotNull
    private boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id", nullable = false)
    private Channel channel;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getChannelId() {
        return channelId;
    }

    public void setChannelId(UUID channelId) {
        this.channelId = channelId;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public UUID getCreatedUserId() {
        return createdUserId;
    }

    public void setCreatedUserId(UUID createdUserId) {
        this.createdUserId = createdUserId;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public UUID getUpdatedUserId() {
        return updatedUserId;
    }

    public void setUpdatedUserId(UUID updatedUserId) {
        this.updatedUserId = updatedUserId;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}
