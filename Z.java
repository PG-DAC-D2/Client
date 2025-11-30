import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

class Movie {
    int id;
    String title;
    double rating;

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public double getRating() {
        return rating;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public Movie(int id, String title, double rating) {
        this.id = id;
        this.title = title;
        this.rating = rating;
    }

    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", rating=" + rating +
                '}';
    }
}

public class Z {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        writeInFile();
        readInFile();
    }

    private static void readInFile() {
        List<Movie> movies = new ArrayList<>();
        try (FileInputStream fin = new FileInputStream("temp.db")) {
            try (DataInputStream dis = new DataInputStream(fin)) {
                while (true) {
                    Movie movie = new Movie(dis.readInt(), dis.readUTF(), dis.readDouble());
                    movies.add(movie);
                }
            }
        } catch (Exception e) {
            // TODO: handle exception
        }
        movies.forEach(e-> System.out.println(e));
    }

    private static void writeInFile() {
        List<Movie> movies = new ArrayList<>();
        movies.add(new Movie(1, "Inception", 8.8));
        movies.add(new Movie(2, "The Dark Knight", 9.0));
        movies.add(new Movie(3, "Interstellar", 8.6));
        try (FileOutputStream ft = new FileOutputStream("temp.db")) {
            try (DataOutputStream dos = new DataOutputStream(ft)) {
                for (Movie movie : movies) {
                    dos.writeInt(movie.getId());
                    dos.writeUTF(movie.getTitle());
                    dos.writeDouble(movie.getRating());
                }
            }
        } catch (Exception e) {
            // TODO: handle exception
        }

    }
}