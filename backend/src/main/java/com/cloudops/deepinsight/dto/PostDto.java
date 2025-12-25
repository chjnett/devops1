package com.cloudops.deepinsight.dto;

import com.cloudops.deepinsight.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {

    private Long id;
    private String title;
    private String content;
    private Post.Category category;
    private String imagePath;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean published;

    public static PostDto from(Post post) {
        return PostDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .category(post.getCategory())
                .imagePath(post.getImagePath())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .published(post.isPublished())
                .build();
    }
}
