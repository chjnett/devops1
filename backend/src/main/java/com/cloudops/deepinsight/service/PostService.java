package com.cloudops.deepinsight.service;

import com.cloudops.deepinsight.dto.PostDto;
import com.cloudops.deepinsight.entity.Post;
import com.cloudops.deepinsight.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostService {

    private final PostRepository postRepository;

    /**
     * 게시물 생성
     */
    @Transactional
    public PostDto createPost(Post post) {
        Post savedPost = postRepository.save(post);
        log.info("게시물 생성 완료 - ID: {}, 제목: {}", savedPost.getId(), savedPost.getTitle());
        return PostDto.from(savedPost);
    }

    /**
     * 게시물 수정
     */
    @Transactional
    public PostDto updatePost(Long postId, Post updatedPost) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다. ID: " + postId));

        post.setTitle(updatedPost.getTitle());
        post.setContent(updatedPost.getContent());
        post.setCategory(updatedPost.getCategory());
        post.setImagePath(updatedPost.getImagePath());
        post.setPublished(updatedPost.isPublished());

        Post savedPost = postRepository.save(post);
        log.info("게시물 수정 완료 - ID: {}", savedPost.getId());
        return PostDto.from(savedPost);
    }

    /**
     * 게시물 삭제
     */
    @Transactional
    public void deletePost(Long postId) {
        if (!postRepository.existsById(postId)) {
            throw new IllegalArgumentException("게시물을 찾을 수 없습니다. ID: " + postId);
        }
        postRepository.deleteById(postId);
        log.info("게시물 삭제 완료 - ID: {}", postId);
    }

    /**
     * 공개된 게시물 목록 조회
     */
    @Transactional(readOnly = true)
    public Page<PostDto> getPublishedPosts(Pageable pageable) {
        return postRepository.findByPublishedTrue(pageable)
                .map(PostDto::from);
    }

    /**
     * 카테고리별 게시물 조회
     */
    @Transactional(readOnly = true)
    public Page<PostDto> getPostsByCategory(Post.Category category, Pageable pageable) {
        return postRepository.findByCategoryAndPublishedTrue(category, pageable)
                .map(PostDto::from);
    }

    /**
     * 게시물 상세 조회
     */
    @Transactional(readOnly = true)
    public PostDto getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다. ID: " + postId));
        return PostDto.from(post);
    }

    /**
     * 최신 게시물 조회
     */
    @Transactional(readOnly = true)
    public List<PostDto> getRecentPosts() {
        return postRepository.findTop5ByPublishedTrueOrderByCreatedAtDesc()
                .stream()
                .map(PostDto::from)
                .collect(Collectors.toList());
    }
}
