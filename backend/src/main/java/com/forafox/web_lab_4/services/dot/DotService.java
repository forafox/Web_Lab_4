package com.forafox.web_lab_4.services.dot;

import com.forafox.web_lab_4.DTO.DotRequest;
import com.forafox.web_lab_4.DTO.DotResponse;
import com.forafox.web_lab_4.DTO.DotsResponse;
import com.forafox.web_lab_4.exception.DotNotFoundException;
import com.forafox.web_lab_4.models.dot.Dot;
import com.forafox.web_lab_4.models.dot.DotRepository;
import com.forafox.web_lab_4.models.user.User;
import com.forafox.web_lab_4.models.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DotService {

    @Autowired
    private DotRepository repository;

    @Autowired
    private UserRepository userRepository;

    public DotResponse saveDot(DotRequest dotRequest,String username) {

        Optional<User> user  = userRepository.findByUsername(username);

        if(user.isPresent()) {
            Dot dot = Dot.builder()
                    .user(user.get())
                    .x(dotRequest.x())
                    .y(dotRequest.y())
                    .r(dotRequest.r())
                    .time(DotsChecker.getCreateTime())//TO DO
                    .status(DotsChecker.isHit(dotRequest.x(),dotRequest.y(),dotRequest.r()))
                    .build();
            repository.save(dot);

            return DotResponse.builder()
                    .status(dot.getStatus())
                    .x(dot.getX())
                    .y(dot.getY())
                    .r(dot.getR())
                    .id(dot.getId())
                    .username(dot.getUser().getUsername())
                    .time(dot.getTime())
                    .build();
        }else {
            throw new RuntimeException(); //TO DO
        }
    }

    public DotsResponse getDots() {
         List<Dot> dotsFromDB=repository.findAll();
         List<DotResponse> dotResponses = new ArrayList<>();
        for (Dot dot: dotsFromDB) {
            dotResponses.add(DotResponse.builder()
                    .status(dot.getStatus())
                    .x(dot.getX())
                    .y(dot.getY())
                    .r(dot.getR())
                    .id(dot.getId())
                    .username(dot.getUser().getUsername())
                    .time(dot.getTime())
                    .build());
        }
            return DotsResponse.builder()
                    .dots(dotResponses)
                    .build();
    }
    public DotsResponse clearDotsInBD() {
       List<Dot> dots=repository.findAll();
       if(dots.isEmpty()){
           throw new DotNotFoundException();
       }else{
           return DotsResponse.builder()
                   .dots(null)
                   .build();
       }
    }
    public DotResponse getById(Long id){
        Optional<Dot> dot = repository.findById(id);
        if(dot.isEmpty()){
            throw new DotNotFoundException();
        }else{
            return DotResponse.builder()
                    .status(dot.get().getStatus())
                    .x(dot.get().getX())
                    .y(dot.get().getY())
                    .r(dot.get().getR())
                    .id(dot.get().getId())
                    .username(dot.get().getUser().getUsername())
                    .time(dot.get().getTime())
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
                    .status(dot.get().getStatus())
                    .x(dot.get().getX())
                    .y(dot.get().getY())
                    .r(dot.get().getR())
                    .id(dot.get().getId())
                    .username(dot.get().getUser().getUsername())
                    .time(dot.get().getTime())
                    .build();
        }
    }
    private static class DotsChecker {
        public static String isHit(double x,double y,double r) {
            if(r==0) {
                return "Miss";
            }else{
                return ((isCircleZone(x, y, r) || isTriangleZone(x, y, r) || isRectangleZone(x, y, r))) ? "Hit!" : "Miss!";
            }

        }

        private static boolean isRectangleZone(double x, double y, double r) {
            return (x >= 0) && (x <= r / 2) && (y <= 0) && (y >= -r);
        }

        private static boolean isCircleZone(double x, double y, double r) {
            return ((x * x + y * y) <= (r * r)) && (x >= 0) && (y >= 0);
        }

        private static boolean isTriangleZone(double x, double y, double r) {
//        (1, 2, 3 - вершины треугольника, 0 - точка)
            double x1 = -r , x2 = 0, x3 = 0, y1 = 0, y2 = 0, y3 = r / 2;
            double a1 = (x1 - x) * (y2 - y1) - (x2 - x1) * (y1 - y);
            double a2 = (x2 - x) * (y3 - y2) - (x3 - x2) * (y2 - y);
            double a3 = (x3 - x) * (y1 - y3) - (x1 - x3) * (y3 - y);

            return ((x <= 0) && (y >= 0) && (a1 >= 0 && a2 >= 0 && a3 >= 0) || (a1 <= 0 && a2 <= 0 && a3 <= 0));
        }

        private static String getCreateTime(){
            Date date = new Date(System.currentTimeMillis());
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            return formatter.format(date);
        }
    }


}
