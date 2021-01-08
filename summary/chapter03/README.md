# 03 스프링 5 - 작업에 적합한 기술 스택

<details><summary>Table of Contents</summary>

-   스프링 제어의 역전(IoC)과 의존성 주입 [🔗](#스프링-제어의-역전ioc과-의존성-주입)
    -   스프링 컨테이너 구동 [🔗](#스프링-컨테이너-구동)
    -   어노테이션 기반의 설정 [🔗](#어노테이션-기반의-설정)
-   스프링 MVC [🔗](#기본-개념)
    -   자바 EE 서블릿 [🔗](#함수와-메소드)
    -   DispatcherServlet [🔗](#컴포넌트)
    -   뷰(Views) [🔗](#vue-인스턴스-라이프-사이클)
    -   필터 [🔗](#필터)
-   스프링 JDBC와 JPA [🔗](#믹스인)
    -   JDBC 드라이버 [🔗](#플러그인)
    -   스프링 JDBC [🔗](#플러그인)
    -   하이버네이트 [🔗](#플러그인)
-   스프링 AOP [🔗](#뒷받침하는-기술)
    -   관심사 [🔗](#반응형-시스템)
    -   애스펙트 [🔗](#반응형-시스템)
    -   조인 포인트 [🔗](#반응형-시스템)
    -   어드바이스 [🔗](#반응형-시스템)
    -   포인트컷 [🔗](#반응형-시스템)
    -   AOP 프락시 [🔗](#반응형-시스템)
    -   위빙 [🔗](#반응형-시스템)
    -   @SecurityCheck [🔗](#반응형-시스템)
    -   AOP 실행 흐름 [🔗](#반응형-시스템)
-   스프링 트랜잭션 관리 [🔗](#반응형-시스템)
    -   PlatformTransactionManager [🔗](#반응형-시스템)
    -   선언적 트랜잭션 관리 [🔗](#반응형-시스템)
-   스프링 부트 [🔗](#반응형-시스템)
    -   스타터 [🔗](#반응형-시스템)
    -   Autoconfiguration [🔗](#반응형-시스템)
-   조합하기 [🔗](#반응형-시스템)
    -   코드 합치기 [🔗](#반응형-시스템)
    -   API 추가하기 [🔗](#반응형-시스템)
    -   HTTP 클라이언트 - axios [🔗](#반응형-시스템)
    -   패키지 app.messages [🔗](#반응형-시스템)

</details>


## 스프링 제어의 역전(IoC)과 의존성 주입

**# 자바의 객체 의존성 관리**

1. 객체가 직접 의존 관계에 있는 객체들의 생성자 호출
```java
public class RegistrationService {
    private MailSender mailSender;
    public RegistrationService() {
        this.mailSender = new MailSender();
    }
}
```
2. 의존성 주입
```java
public class RegistrationService {
    private MailSender mailSender;
    public RegistrationService(MailSender mailSender) {
        this.mailSender = mailSender;
    }
}
```

**IoC(제어의 역전이, Inversion of Control)** 는 의존성을 객체가 관리하는 것이 아니라 스프링이 관리한다는 의미이다.  
스프링은 필요한 의존 관계를 설정 파일에서 찾는다.  
설정 파일은 과거에는 XML로 작성하였지만, 지금은 자바 코드로 작성한다.  

### 스프링 컨테이너 구동

Maven을 활용한 스프링 애플리케이션 구동

**Message.java**
```java
package app.messages;

public class Message {
    private String text;
    public Message(String text) {
        this.text = text;
    }
    public String getText() {
        return text;
    }
}
```

**MessageRepository.java**
```java
package app.messages;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class MessageRepository {
    private final static Log log = LogFactory.getLog(MessageRepository.class);

    public void saveMessage(Message message) {
        log.info("Saved message: " + message.getText());
    }
}
```

**MessageService.java**
```java
package app.messages;

public class MessageService {
    private MessageRepository repository;

    public MessageService(MessageRepository repository) {
        this.repository = repository;
    }

    public void save(String text) {
        this.repository.saveMessage(new Message(text));
    }
}
```

**AppConfig.java**
```java
package app.messages;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
public class AppConfig {
    
    @Bean
    public MessageRepository messageRepository() {
        return new MessageRepository();
    }

    @Bean
    MessageService messageService() {
        return new MessageService(messageRepository());
    }
}
```

**App.java**
```java
package app.messages;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {
    public static void main( String[] args ) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        MessageService messageService = context.getBean(MessageService.class);
        messageService.save("Hello Spring!");
    }
}
```

### 어노테이션 기반의 설정

Bean 객체가 적을 경우 `AppConfig.java`에서 생성자 또는 setter 주입 방식으로 등록할 수 있다.  
하지만 Bean 객체가 많아지면 이를 수동으로 처리하기 어렵다. → 어노테이션 기반으로 Bean을 등록한다.

**# 빈 선언**

`@Component`, `@Service`, `@Controller`, `@Repository` 어노테이션으로 Bean 객체임을 선언한다.  
스프링에서는 Bean 객체로 선언된 Component를 의존성 주입으로 관리할 수 있다.

**# 의존성 주입**

`@Autowired` 어노테이션으로 의존성 주입을 적용한다.

**# 의존성 주입 방법**
1. 생성자 주입
2. setter 주입
3. 필드 기반 주입

생성자 주입 방식으로 의존성을 주입하기 권장한다.