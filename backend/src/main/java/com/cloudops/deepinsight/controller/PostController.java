package com.cloudops.deepinsight.controller;

import com.cloudops.deepinsight.dto.PostDto;
import com.cloudops.deepinsight.entity.Post;
import com.cloudops.deepinsight.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;

    /**
     * 공개된 게시물 목록 조회
     */
    @GetMapping
    public ResponseEntity<List<PostDto>> getPosts(
            @RequestParam(required = false) Post.Category category,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        Page<PostDto> posts;
        if (category != null) {
            posts = postService.getPostsByCategory(category, pageable);
        } else {
            posts = postService.getPublishedPosts(pageable);
        }

        return ResponseEntity.ok(posts.getContent());
    }

    /**
     * 최신 게시물 조회 (메인 페이지용)
     */
    @GetMapping("/recent")
    public ResponseEntity<List<PostDto>> getRecentPosts() {
        List<PostDto> posts = postService.getRecentPosts();
        return ResponseEntity.ok(posts);
    }

    /**
     * 게시물 상세 조회
     */
    @GetMapping("/{postId}")
    public ResponseEntity<PostDto> getPost(@PathVariable Long postId) {
        PostDto post = postService.getPostById(postId);
        return ResponseEntity.ok(post);
    }

    /**
     * 게시물 생성 (관리자용)
     */
    @PostMapping("/admin")
    public ResponseEntity<PostDto> createPost(@RequestBody Post post) {
        PostDto createdPost = postService.createPost(post);
        return ResponseEntity.ok(createdPost);
    }

    /**
     * 게시물 수정 (관리자용)
     */
    @PutMapping("/admin/{postId}")
    public ResponseEntity<PostDto> updatePost(
            @PathVariable Long postId,
            @RequestBody Post post
    ) {
        PostDto updatedPost = postService.updatePost(postId, post);
        return ResponseEntity.ok(updatedPost);
    }

    /**
     * 게시물 삭제 (관리자용)
     */
    @DeleteMapping("/admin/{postId}")
    public ResponseEntity<Map<String, Object>> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "게시물이 삭제되었습니다."
        ));
    }
}
