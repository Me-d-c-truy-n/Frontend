package com.crawldata.back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Chapter {
    String novelId;
    String novelName;
    String chapterId;
    String name;
    Integer total;
    Author author;
}
