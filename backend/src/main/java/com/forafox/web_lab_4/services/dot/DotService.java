package com.forafox.web_lab_4.services.dot;

import com.forafox.web_lab_4.DTO.DotRequest;
import com.forafox.web_lab_4.DTO.DotResponse;
import com.forafox.web_lab_4.DTO.DotsResponse;
import com.forafox.web_lab_4.exception.DotNotFoundException;
import com.forafox.web_lab_4.models.dot.Dot;
import com.forafox.web_lab_4.models.dot.DotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DotService {

    @Autowired
    private DotRepository repository;

    public DotResponse saveDot(DotRequest dotRequest) {
        Dot dot = Dot.builder()
                .x(dotRequest.getX())
                .y(dotRequest.getY())
                .r(dotRequest.getR())
                .time("1")//TO DO
                .scriptTime(1)//TO DO
                .status(true)//TO DO
                .build();
        repository.save(dot);

       return DotResponse.builder()
               .dot(dot)//TO DO
               .build();
    }

    public DotsResponse getDots() {
        return DotsResponse.builder()
                        .dots(repository.findAll())
                .build();
    }
    public DotsResponse clearDotsInBD() {
       List<Dot> dots=repository.findAll();
       if(dots.isEmpty()){
           throw new DotNotFoundException();
       }else{
           return DotsResponse.builder()
                   .dots(dots)
                   .build();
       }
    }
    public DotResponse getById(Long id){
        Optional<Dot> dot = repository.findById(id);
        if(dot.isEmpty()){
            throw new DotNotFoundException();
        }else{
            return DotResponse.builder()
                    .dot(dot.get())
                    .build();
        }
    }

    public DotResponse deleteDot(Long id) {
        Optional<Dot> dot = repository.findById(id);//TO DO
        if(dot.isEmpty()) {
            throw new DotNotFoundException();
        }else{
            repository.deleteById(id);
            return DotResponse.builder()
                    .dot(dot.get())
                    .build();
        }
    }
}
