package com.cloudops.deepinsight.repository;

import com.cloudops.deepinsight.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    /**
     * 카테고리별 게시물 조회 (페이징)
     */
    Page<Post> findByCategoryAndPublishedTrue(Post.Category category, Pageable pageable);

    /**
     * 공개된 게시물만 조회
     */
    Page<Post> findByPublishedTrue(Pageable pageable);

    /**
     * 제목 검색
     */
    List<Post> findByTitleContainingAndPublishedTrue(String keyword);

    /**
     * 최신 게시물 조회 (Limit)
     */
    List<Post> findTop5ByPublishedTrueOrderByCreatedAtDesc();
}
